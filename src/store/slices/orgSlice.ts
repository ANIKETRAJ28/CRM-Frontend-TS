import { getUserOrgs } from "@/apis/getOrgs";
import { createOrg, joinAsEngineer, joinAsUser } from "@/apis/userOrg";
import { IUserOrg } from "@/interfaces/userOrg";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface IOrgState {
  orgs: IUserOrg[] | null;
}

const initialState: IOrgState = {
  orgs: localStorage.getItem("orgs")
    ? JSON.parse(localStorage.getItem("orgs") as string)
    : null,
};

export const getOrgs = createAsyncThunk("/org", async () => {
  const response = await getUserOrgs();
  return response;
});

export const addOrgAsEngineer = createAsyncThunk(
  "/org/addOrg/engineer",
  async (hashCode: string) => {
    const response = await joinAsEngineer(hashCode);
    return response;
  }
);

export const addOrg = createAsyncThunk(
  "/org/addOrg",
  async (orgName: string) => {
    const response = await createOrg(orgName);
    return response;
  }
);

export const addOrgForUser = createAsyncThunk(
  "/org/addOrg/user",
  async (orgName: string) => {
    const response = await joinAsUser(orgName);
    return response;
  }
);

const orgSlice = createSlice({
  name: "Org",
  initialState,
  reducers: {
    removeOrg: (state: IOrgState) => {
      state.orgs = null;
      localStorage.removeItem("orgs");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrgs.fulfilled, (state, action) => {
      state.orgs = action.payload;
      localStorage.setItem("orgs", JSON.stringify(action.payload));
      toast.success("Orgs fetched successfully", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    });
    builder.addCase(getOrgs.rejected, (state) => {
      state.orgs = null;
      localStorage.removeItem("orgs");
      toast.error("Failed to fetch orgs", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrgAsEngineer.fulfilled, (state, action) => {
      if (state.orgs === null) {
        state.orgs = [action.payload];
        localStorage.setItem("orgs", JSON.stringify([action.payload]));
        return;
      } else {
        state.orgs = [...state.orgs, action.payload];
        localStorage.setItem("orgs", JSON.stringify(state.orgs));
      }
      toast.success("Org added successfully", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrgAsEngineer.rejected, () => {
      toast.error("Failed to add org", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrg.fulfilled, (state, action) => {
      if (state.orgs === null) {
        state.orgs = [action.payload];
        localStorage.setItem("orgs", JSON.stringify([action.payload]));
        return;
      } else {
        state.orgs = [...state.orgs, action.payload];
        localStorage.setItem("orgs", JSON.stringify(state.orgs));
      }
      toast.success("Org created successfully", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrg.rejected, () => {
      toast.error("Failed to create org", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrgForUser.fulfilled, (state, action) => {
      if (state.orgs === null) {
        state.orgs = [action.payload];
        localStorage.setItem("orgs", JSON.stringify([action.payload]));
        return;
      } else {
        state.orgs = [...state.orgs, action.payload];
        localStorage.setItem("orgs", JSON.stringify(state.orgs));
      }
      toast.success("Org joined successfully", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    });
    builder.addCase(addOrgForUser.rejected, () => {
      toast.error("Failed to join org", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    });
  },
});

export const { removeOrg } = orgSlice.actions;
export const OrgSlice = orgSlice.reducer;
