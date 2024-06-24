"use client";

import Swal from "sweetalert2";
import { handleLogout } from "@/actions";

export default function ButtonLogout() {
  async function handleLogoutClick() {
    try {
      const response = await handleLogout();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message,
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to log out. Please try again.",
      });
    }
  }

  return (
    <button onClick={handleLogoutClick} className="ml-4 bg-transparent border border-blue-600 text-blue-600 font-light px-4 py-2 rounded hover:bg-blue-100">
      Log Out
    </button>
  );
}
