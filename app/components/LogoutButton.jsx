"use client";

import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <button
      onClick={async () => {
        if (!confirm("Are you sure?")) return;
        try {
          await toast.promise(signOut(auth), {
            error: (e) => e?.message,
            loading: "Loading...",
            success: "Successfully Logged out",
          });
        } catch (error) {
          toast.error(error?.message);
        }
      }}
      title="Logout"
      className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
    >
      <LogOut size={14} />
    </button>
  );
}
