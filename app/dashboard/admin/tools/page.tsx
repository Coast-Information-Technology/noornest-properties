"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Mail,
  RefreshCw,
  Send,
  UserCog,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  AdminPageHeader,
  AdminPageShell,
  AdminPanel,
  adminErrorMessageClass,
  adminSuccessMessageClass,
} from "@/components/dashboard/AdminSurface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import {
  createAdminStaffUser,
  getAdminErrorMessage,
  getAdminOnboardingProgress,
  resetAdminOnboarding,
  sendAdminTestEmail,
  updateOwnAdminProfile,
} from "@/lib/apiServices/adminService";
import { formatAdminDateTime } from "@/lib/adminUsers";
import { isAdminRole } from "@/lib/auth/roles";
import type {
  AdminEmailTestScenario,
  AdminOnboardingProgress,
  AdminOnboardingTrack,
  AdminStaffRole,
} from "@/types/admin";

const STAFF_ROLE_OPTIONS: { value: AdminStaffRole; label: string }[] = [
  { value: "customer_care_rep", label: "Customer care rep" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super admin" },
];

const EMAIL_SCENARIOS: { value: AdminEmailTestScenario; label: string }[] = [
  { value: "delivered", label: "Delivered" },
  { value: "bounced", label: "Bounced" },
  { value: "complained", label: "Complained" },
  { value: "suppressed", label: "Suppressed" },
];

const ONBOARDING_TRACKS: { value: AdminOnboardingTrack; label: string }[] = [
  { value: "buyer_investor", label: "Buyer / investor" },
  { value: "property_sourcer", label: "Property sourcer" },
  { value: "agent_vendor", label: "Agent / vendor" },
  { value: "service_provider", label: "Service provider" },
];

const inputClass =
  "h-10 rounded-lg border-border bg-muted/50 shadow-none focus-visible:ring-primary/30";

const selectClass =
  "h-10 w-full rounded-lg border-border bg-muted/50 shadow-none focus-visible:ring-primary/30";

const optional = (value: string) => value.trim() || undefined;

const Message = ({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) => {
  if (!message) return null;

  return (
    <div
      className={
        type === "success"
          ? adminSuccessMessageClass
          : adminErrorMessageClass
      }
    >
      {message}
    </div>
  );
};

const FieldLabel = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="text-xs font-semibold uppercase tracking-normal text-muted-foreground"
  >
    {children}
  </label>
);

function ToolFormShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(191,161,74,0.24)]">
          <UserCog className="h-4 w-4" />
        </span>
      </div>
      <div className="rounded-lg bg-muted p-4">
        <div className="rounded-lg border border-border bg-background p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function ToolWorkspace({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <AdminPanel className="overflow-hidden bg-background">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-muted via-background to-accent/50 px-5 pb-16 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <Badge className="mb-3 rounded-full border border-border bg-background px-3 py-1 text-foreground">
                  Admin tool
                </Badge>
                <h2 className="text-3xl font-semibold tracking-normal text-foreground">
                  {title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            <Badge className="w-fit rounded-full bg-secondary px-4 py-1.5 text-secondary-foreground">
              Live action
            </Badge>
          </div>
        </div>

        <div className="-mt-10 px-5 pb-5">
          <div className="mx-auto max-w-5xl rounded-lg border border-border bg-background p-5 shadow-[0_18px_50px_rgba(37,31,18,0.08)]">
            {children}
          </div>
        </div>
      </CardContent>
    </AdminPanel>
  );
}

export default function AdminToolsPage() {
  const { user, isLoading } = useUser();
  const [staffForm, setStaffForm] = useState({
    email: "",
    role: "customer_care_rep" as AdminStaffRole,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
  });
  const [emailForm, setEmailForm] = useState({
    scenario: "delivered" as AdminEmailTestScenario,
    label: "asancha",
    to: "",
    subject: "Asancha Email Test",
  });
  const [onboardingPublicId, setOnboardingPublicId] = useState("");
  const [onboardingTrack, setOnboardingTrack] = useState<
    AdminOnboardingTrack | "auto"
  >("auto");
  const [hardReset, setHardReset] = useState(false);
  const [onboardingProgress, setOnboardingProgress] =
    useState<AdminOnboardingProgress | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [pending, setPending] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const canUseAdminTools = useMemo(() => isAdminRole(user?.role), [user?.role]);

  const staffRoleOptions = useMemo(() => {
    if (user?.role === "super_admin") return STAFF_ROLE_OPTIONS;
    return STAFF_ROLE_OPTIONS.filter(
      (option) => option.value === "customer_care_rep"
    );
  }, [user?.role]);

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleError = (error: unknown, fallback: string) => {
    setErrorMessage(getAdminErrorMessage(error, fallback));
  };

  const handleCreateStaff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();
    setPending("staff");

    try {
      await createAdminStaffUser({
        email: staffForm.email.trim(),
        role: staffForm.role,
        firstName: optional(staffForm.firstName),
        lastName: optional(staffForm.lastName),
        phoneNumber: optional(staffForm.phoneNumber),
        gender: optional(staffForm.gender),
        password: optional(staffForm.password),
      });
      setSuccessMessage("Staff user created.");
      setStaffForm((current) => ({
        ...current,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        password: "",
      }));
    } catch (error: unknown) {
      handleError(error, "Unable to create staff user.");
    } finally {
      setPending("");
    }
  };

  const handleUpdateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();
    setPending("profile");

    try {
      await updateOwnAdminProfile({
        firstName: optional(profileForm.firstName),
        lastName: optional(profileForm.lastName),
        gender: optional(profileForm.gender),
      });
      setSuccessMessage("Admin profile updated.");
    } catch (error: unknown) {
      handleError(error, "Unable to update admin profile.");
    } finally {
      setPending("");
    }
  };

  const handleSendEmailTest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();
    setPending("email");

    try {
      await sendAdminTestEmail({
        scenario: emailForm.to.trim() ? undefined : emailForm.scenario,
        label: optional(emailForm.label),
        to: optional(emailForm.to),
        subject: optional(emailForm.subject),
      });
      setSuccessMessage("Email test request sent.");
    } catch (error: unknown) {
      handleError(error, "Unable to send test email.");
    } finally {
      setPending("");
    }
  };

  const handleLookupOnboarding = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();
    setPending("onboarding");

    try {
      const data = await getAdminOnboardingProgress(
        onboardingPublicId.trim(),
        onboardingTrack === "auto" ? undefined : onboardingTrack
      );
      setOnboardingProgress(data);
      setSuccessMessage("Onboarding progress loaded.");
    } catch (error: unknown) {
      setOnboardingProgress(null);
      handleError(error, "Unable to load onboarding progress.");
    } finally {
      setPending("");
    }
  };

  const handleResetOnboarding = async () => {
    clearMessages();
    setPending("reset-onboarding");

    try {
      await resetAdminOnboarding(onboardingPublicId.trim(), {
        track: onboardingTrack === "auto" ? undefined : onboardingTrack,
        hard: hardReset,
      });
      setSuccessMessage("Onboarding state reset.");
      setResetDialogOpen(false);
      const data = await getAdminOnboardingProgress(
        onboardingPublicId.trim(),
        onboardingTrack === "auto" ? undefined : onboardingTrack
      );
      setOnboardingProgress(data);
    } catch (error: unknown) {
      handleError(error, "Unable to reset onboarding state.");
    } finally {
      setPending("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading admin tools...
      </div>
    );
  }

  if (!canUseAdminTools) return null;

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Operations toolkit"
        title="Admin Tools"
        description="Run staff, profile, email delivery, and onboarding support actions from one controlled admin workspace."
        badge={
          <Badge className="border border-border bg-muted text-foreground">
            {user?.role || "admin"}
          </Badge>
        }
      />

      <Message type="success" message={successMessage} />
      <Message type="error" message={errorMessage} />

      <Tabs defaultValue="staff" className="space-y-4">
        <div className="rounded-lg border border-border bg-gradient-to-r from-muted via-background to-accent/40 p-3 shadow-[0_14px_38px_rgba(37,31,18,0.06)]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-primary">
                Tool suite
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose one admin operation to run.
              </p>
            </div>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-lg border border-border bg-background/80 p-1 xl:w-auto">
              <TabsTrigger
                value="staff"
                className="h-10 flex-none rounded-lg px-4 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <UserPlus className="h-4 w-4" />
                Staff
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="h-10 flex-none rounded-lg px-4 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <UserCog className="h-4 w-4" />
                My Profile
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="h-10 flex-none rounded-lg px-4 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <Mail className="h-4 w-4" />
                Email Test
              </TabsTrigger>
              <TabsTrigger
                value="onboarding"
                className="h-10 flex-none rounded-lg px-4 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <Workflow className="h-4 w-4" />
                Onboarding
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="staff">
          <ToolWorkspace
            icon={UserPlus}
            title="Create Staff User"
            description="Create a staff account with the fields currently supported by the backend."
          >
            <ToolFormShell
              title="Staff details"
              description="Only submit fields supported by the current backend contract."
            >
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateStaff}>
                <div className="space-y-2">
                  <FieldLabel htmlFor="staff-email">Email</FieldLabel>
                  <Input
                    id="staff-email"
                    type="email"
                    required
                    value={staffForm.email}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Role</FieldLabel>
                  <Select
                    value={staffForm.role}
                    onValueChange={(value) =>
                      setStaffForm((current) => ({
                        ...current,
                        role: value as AdminStaffRole,
                      }))
                    }
                  >
                    <SelectTrigger className={selectClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {staffRoleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="staff-first-name">First name</FieldLabel>
                  <Input
                    id="staff-first-name"
                    value={staffForm.firstName}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="staff-last-name">Last name</FieldLabel>
                  <Input
                    id="staff-last-name"
                    value={staffForm.lastName}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="staff-phone">Phone number</FieldLabel>
                  <Input
                    id="staff-phone"
                    value={staffForm.phoneNumber}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        phoneNumber: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="staff-gender">Gender</FieldLabel>
                  <Input
                    id="staff-gender"
                    value={staffForm.gender}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        gender: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="staff-password">
                    Temporary password
                  </FieldLabel>
                  <Input
                    id="staff-password"
                    type="password"
                    value={staffForm.password}
                    className={inputClass}
                    onChange={(event) =>
                      setStaffForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end md:col-span-2">
                  <Button type="submit" disabled={pending === "staff"}>
                    <UserPlus className="h-4 w-4" />
                    {pending === "staff" ? "Creating..." : "Create Staff"}
                  </Button>
                </div>
              </form>
            </ToolFormShell>
          </ToolWorkspace>
        </TabsContent>

        <TabsContent value="profile">
          <ToolWorkspace
            icon={UserCog}
            title="Update My Admin Profile"
            description="Update your own admin profile fields supported by the backend."
          >
            <ToolFormShell
              title="Profile fields"
              description="These values update your own admin profile."
            >
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleUpdateProfile}>
                <div className="space-y-2">
                  <FieldLabel htmlFor="profile-first-name">First name</FieldLabel>
                  <Input
                    id="profile-first-name"
                    value={profileForm.firstName}
                    className={inputClass}
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="profile-last-name">Last name</FieldLabel>
                  <Input
                    id="profile-last-name"
                    value={profileForm.lastName}
                    className={inputClass}
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="profile-gender">Gender</FieldLabel>
                  <Input
                    id="profile-gender"
                    value={profileForm.gender}
                    className={inputClass}
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        gender: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end md:col-span-2">
                  <Button type="submit" disabled={pending === "profile"}>
                    <UserCog className="h-4 w-4" />
                    {pending === "profile" ? "Saving..." : "Update Profile"}
                  </Button>
                </div>
              </form>
            </ToolFormShell>
          </ToolWorkspace>
        </TabsContent>

        <TabsContent value="email">
          <ToolWorkspace
            icon={Mail}
            title="Test Email Delivery"
            description="Send a real backend email-provider test request."
          >
            <ToolFormShell
              title="Email test request"
              description="Use a scenario when no recipient is supplied, or send to a real recipient."
            >
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSendEmailTest}>
                <div className="space-y-2">
                  <FieldLabel>Scenario</FieldLabel>
                  <Select
                    value={emailForm.scenario}
                    onValueChange={(value) =>
                      setEmailForm((current) => ({
                        ...current,
                        scenario: value as AdminEmailTestScenario,
                      }))
                    }
                  >
                    <SelectTrigger className={selectClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EMAIL_SCENARIOS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="email-label">Label</FieldLabel>
                  <Input
                    id="email-label"
                    value={emailForm.label}
                    className={inputClass}
                    onChange={(event) =>
                      setEmailForm((current) => ({
                        ...current,
                        label: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="email-to">Recipient</FieldLabel>
                  <Input
                    id="email-to"
                    type="email"
                    value={emailForm.to}
                    className={inputClass}
                    onChange={(event) =>
                      setEmailForm((current) => ({
                        ...current,
                        to: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="email-subject">Subject</FieldLabel>
                  <Input
                    id="email-subject"
                    value={emailForm.subject}
                    className={inputClass}
                    onChange={(event) =>
                      setEmailForm((current) => ({
                        ...current,
                        subject: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end md:col-span-2">
                  <Button type="submit" disabled={pending === "email"}>
                    <Send className="h-4 w-4" />
                    {pending === "email" ? "Sending..." : "Send Test Email"}
                  </Button>
                </div>
              </form>
            </ToolFormShell>
          </ToolWorkspace>
        </TabsContent>

        <TabsContent value="onboarding">
          <ToolWorkspace
            icon={Workflow}
            title="Onboarding Support"
            description="Look up and reset real onboarding state by user public ID."
          >
            <ToolFormShell
              title="Lookup controls"
              description="A reset requires a public ID and explicit confirmation."
            >
              <div className="space-y-6">
                <form
                  className="grid gap-4 lg:grid-cols-[1fr_230px_auto]"
                  onSubmit={handleLookupOnboarding}
                >
                  <div className="space-y-2">
                    <FieldLabel htmlFor="onboarding-public-id">
                      User public ID
                    </FieldLabel>
                    <Input
                      id="onboarding-public-id"
                      required
                      value={onboardingPublicId}
                      className={inputClass}
                      onChange={(event) =>
                        setOnboardingPublicId(event.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Track</FieldLabel>
                    <Select
                      value={onboardingTrack}
                      onValueChange={(value) =>
                        setOnboardingTrack(
                          value as AdminOnboardingTrack | "auto"
                        )
                      }
                    >
                      <SelectTrigger className={selectClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        {ONBOARDING_TRACKS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" disabled={pending === "onboarding"}>
                      <RefreshCw className="h-4 w-4" />
                      {pending === "onboarding" ? "Loading..." : "Lookup"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={!onboardingPublicId.trim()}
                      onClick={() => setResetDialogOpen(true)}
                    >
                      Reset
                    </Button>
                  </div>
                </form>

                {onboardingProgress ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-4">
                      <div className="rounded-lg border border-border bg-muted p-4">
                        <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                          Track
                        </div>
                        <div className="mt-2 text-sm font-semibold text-foreground">
                          {onboardingProgress.track || "Unknown"}
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-muted p-4">
                        <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                          Status
                        </div>
                        <div className="mt-2">
                          <Badge>{onboardingProgress.status || "unknown"}</Badge>
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-muted p-4">
                        <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                          Current Step
                        </div>
                        <div className="mt-2 text-sm font-semibold text-foreground">
                          {onboardingProgress.currentStep ?? "Unknown"}
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-muted p-4">
                        <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                          Completed
                        </div>
                        <div className="mt-2 text-sm font-semibold text-foreground">
                          {formatAdminDateTime(onboardingProgress.completedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-border bg-background">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="bg-muted">Step</TableHead>
                            <TableHead className="bg-muted">Title</TableHead>
                            <TableHead className="bg-muted">Status</TableHead>
                            <TableHead className="bg-muted">Missing</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {onboardingProgress.steps?.length ? (
                            onboardingProgress.steps.map((step, index) => (
                              <TableRow
                                key={`${step.step ?? index}-${step.title ?? "step"}`}
                              >
                                <TableCell>{step.step ?? index + 1}</TableCell>
                                <TableCell className="font-medium">
                                  {step.title || "Untitled step"}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      step.isComplete ? "default" : "secondary"
                                    }
                                  >
                                    {step.isComplete ? "complete" : "incomplete"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-[420px] truncate">
                                  {step.missing?.length
                                    ? step.missing
                                        .map((item) => String(item))
                                        .join(", ")
                                    : "None"}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="h-24 text-center text-sm text-muted-foreground"
                              >
                                No onboarding steps returned.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : null}
              </div>
            </ToolFormShell>
          </ToolWorkspace>
        </TabsContent>
      </Tabs>

      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="rounded-lg border-border">
          <DialogHeader>
            <DialogTitle>Reset onboarding?</DialogTitle>
            <DialogDescription>
              This will reset onboarding state for the selected user and track.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
            <div>
              <div className="font-medium">Hard reset</div>
              <div className="text-sm text-muted-foreground">
                Clear stored onboarding payload as well as progress.
              </div>
            </div>
            <Switch checked={hardReset} onCheckedChange={setHardReset} />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={pending === "reset-onboarding"}
              onClick={() => setResetDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pending === "reset-onboarding"}
              onClick={() => void handleResetOnboarding()}
            >
              {pending === "reset-onboarding" ? "Resetting..." : "Reset"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
