import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

export function Auth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center">
      <Card className="w-[400px] p-6 bg-slate-900 border-slate-800">
        <Tabs
          defaultValue="login"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger
              value="login"
              className="data-[state=inactive]:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-slate-900"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=inactive]:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-slate-900"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={onSubmit}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-200"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form
              onSubmit={onSubmit}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-200"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="signup-email"
                  className="text-slate-200"
                >
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="signup-password"
                  className="text-slate-200"
                >
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
