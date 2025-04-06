import { login } from "@/apis/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ILogin } from "@/interfaces/auth";
import { Label } from "@radix-ui/react-label";
import { LockIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { setUser } from "@/store/slices/authSlice";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });

  async function handleLoginSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      await login(formData);
      toast.success("Login successful", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    }
  }

  useEffect(() => {
    if (id) {
      navigate("/org");
    }
    dispatch(setUser());
  }, [id, navigate, dispatch]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-white bg-blue-950/50">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Email</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/signup")}
              className="w-full text-black hover:bg-gray-300 transition-colors duration-300"
            >
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
