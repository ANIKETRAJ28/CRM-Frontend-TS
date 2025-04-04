import { createSlice } from "@reduxjs/toolkit";

const activeToggleSlice = createSlice({
  name: "ActiveToggle",
  initialState: {
    activeToggle: localStorage.getItem("activeToggle")
      ? (localStorage.getItem("activeToggle") as
          | "all"
          | "assigned"
          | "reported"
          | "members")
      : "reported",
  },
  reducers: {
    toggleActiveState(state, action) {
      state.activeToggle = action.payload;
      localStorage.setItem("activeToggle", state.activeToggle);
    },
    removeToggleActiveState(state) {
      state.activeToggle = "reported";
      localStorage.removeItem("activeToggle");
    },
  },
});

export const { toggleActiveState, removeToggleActiveState } =
  activeToggleSlice.actions;
export const ActiveToggleSlice = activeToggleSlice.reducer;
