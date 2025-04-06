import { Layout } from "@/layout/Layout";
import ProtectedLayoutWrapper from "@/layout/ProtectedLayout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Org } from "@/pages/Org";
import { SignUp } from "@/pages/SignUp";
import { TablePage } from "@/pages/Table";
import { Routes, Route } from "react-router-dom";

export function MainRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/org"
        element={
          <Layout>
            <ProtectedLayoutWrapper>
              <Org />
            </ProtectedLayoutWrapper>
          </Layout>
        }
      />
      <Route
        path="/org/tickets/:reported"
        element={
          <Layout>
            <ProtectedLayoutWrapper>
              <TablePage />
            </ProtectedLayoutWrapper>
          </Layout>
        }
      />
      <Route
        path="/org/tickets/:assigned"
        element={
          <Layout>
            <ProtectedLayoutWrapper>
              <TablePage />
            </ProtectedLayoutWrapper>
          </Layout>
        }
      />
    </Routes>
  );
}
