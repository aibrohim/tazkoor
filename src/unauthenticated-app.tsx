import EmailResetVerify from "pages/email-verify-reset/email-verify-reset"
import ForgotPassword from "pages/forgot-password/forgot-password"
import Login from "pages/login/login"
import PasswordRecovery from "pages/password-recovery/password-recovery"
import SignUp from "pages/sign-up/sign-up"
import Splash from "pages/splash/splash"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"

const UnAuthenticatedApp:FC = function() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/email-reset-verify" element={<EmailResetVerify />} />
    </Routes>
  )
}

export default UnAuthenticatedApp;