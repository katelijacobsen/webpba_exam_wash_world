'use client';

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

type View = "login" | "signup" | "forgotPassword";

export default function Form() {
    const [toggle, setToggle] = useState<View>("login");
    // Don't steal focus on first page load — only after the user switches view
    const [switched, setSwitched] = useState(false);
    const go = (view: View) => { setSwitched(true); setToggle(view); };

    return toggle === "login"
    ? <LoginForm onToggleSignup={() => go("signup")} onForgotPassword={() => go("forgotPassword")} focus={switched}/>
    : toggle === "signup"
    ? <SignupForm onToggleLogin={() => go("login")} focus={switched} />
    : <ForgotPasswordForm onToggleLogin={() => go("login")} onToggleSignup={() => go('signup')} focus={switched}/>
}
