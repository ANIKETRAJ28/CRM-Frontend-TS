import { IRegister, SignupStep } from "@/interfaces/auth";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { ArrowLeftIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { completeProfile, registerEmail, verifyOtp } from "@/apis/register";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [step, setStep] = useState<SignupStep>("email");
  const [formData, setFormData] = useState<IRegister>({
    email: "",
    otp: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // TODO: Implement email verification
      const response: { step: SignupStep; message: string } =
        await registerEmail(formData.email);
      setStep(response.step);
      if (response.step === "otp") {
        toast.success(response.message, {
          style: {
            background: "#4caf50",
            border: "1px solid #4caf50",
            color: "#fff",
          },
        });
      } else {
        toast.warning(response.message, {
          style: {
            background: "#ff9800",
            border: "1px solid #ff9800",
            color: "#fff",
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occured", {
        style: {
          backgroundColor: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // TODO: Implement OTP verification
      const response: { step: SignupStep; message: string } = await verifyOtp(
        formData.otp
      );
      setStep(response.step);
      toast.success(response.message, {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occured", {
        style: {
          backgroundColor: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // TODO: Implement profile creation
      const response = await completeProfile(formData.name, formData.password);
      navigate("/org");
      toast.success(response, {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    if (step === "otp") setStep("email");
  };

  const renderEmailStep = () => (
    <form
      onSubmit={handleEmailSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 bg-blue-950/10"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
      >
        Continue
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/login")}
        className="w-full text-black hover:bg-gray-300 transition-colors duration-300"
      >
        Login
      </Button>
    </form>
  );

  const renderOTPStep = () => (
    <form
      onSubmit={handleOTPSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Enter verification code</Label>
        <InputOTP
          maxLength={6}
          value={formData.otp}
          onChange={(otp) => setFormData({ ...formData, otp })}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="flex-1 text-black"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
          disabled={formData.otp.length !== 6}
        >
          Verify
        </Button>
      </div>
    </form>
  );

  const renderProfileStep = () => (
    <form
      onSubmit={handleProfileSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="name"
            placeholder="Enter your name"
            className="pl-10"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <LockIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            className="pl-10"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
      >
        Create Account
      </Button>
    </form>
  );

  const steps = {
    email: {
      title: "Get Started",
      description: "Enter your email to begin the signup process",
      content: renderEmailStep(),
    },
    otp: {
      title: "Verify Email",
      description: "Enter the 6-digit code sent to your email",
      content: renderOTPStep(),
    },
    profile: {
      title: "Create Profile",
      description: "Set up your account details",
      content: renderProfileStep(),
    },
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-white bg-blue-950/50">
        <CardHeader>
          <CardTitle className="text-2xl">{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>{steps[step].content}</CardContent>
      </Card>
    </div>
  );
}
