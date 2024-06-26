import { MODAL_WINDOW } from "@/types/modalWindow";
import { ModalWindow } from "@/components/ModalWindow/ModalWindow";
import React from "react";
import { StepInput } from "../Rent/Steps/StepInput";
import { useForm } from "@/hooks/forms/useForm";
import { Button } from "../Button";
import { useToast } from "../Toast/useToast";
import { zodResolver } from "@/utils";
import { SignUpData, signUpSchema } from "@/schemas/credentials.schema";
import { Typography } from "../Typography/Typography";
import Link from "next/link";
import { useSignUpAndSignIn } from "@/hooks/auth/useSignUpAndSignIn";
import { useAuth } from "@/auth/useAuth";
import { useModalWindow } from "../ModalWindow/useModalWindow";
import { useRouter } from "next/router";

export const SignUp = () => {
  const router = useRouter();
  const { authData } = useAuth();
  const { setOpenWindowId } = useModalWindow();
  const { promisify } = useToast();
  const [signUpResponse, signUp] = useSignUpAndSignIn();
  const { register, handleSubmit, formState } = useForm<SignUpData>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationFunction: zodResolver(signUpSchema),
    onValid: (data) => {
      const { email, password, fullName } = data;
      const signUpData = {
        fullName,
        email,
        password,
      };
      promisify(
        signUp(signUpData as Omit<SignUpData, "confirmPassword">).then(() => {
          if (typeof router.query.redirect === "string")
            router.push(router.query.redirect);
          else setOpenWindowId(null);
        }),
        {
          pending: "Signing up...",
          success: "Successfully signed up",
          error: "User with the same email exists or an error occurred",
        }
      );
    },
  });

  if (authData.authenticated) return null;

  return (
    <ModalWindow title="Sign up" id={MODAL_WINDOW.SIGN_UP}>
      <form onSubmit={handleSubmit} className="auth-form">
        <StepInput
          label="Full name"
          placeholder="Enter your full name"
          {...register("fullName")}
          error={formState.errors["fullName"] ?? undefined}
        />
        <StepInput
          label="Email"
          placeholder="Your email"
          {...register("email")}
          error={formState.errors["email"] ?? undefined}
        />
        <StepInput
          label="Password"
          placeholder="Your password"
          inputProps={{ type: "password" }}
          {...register("password")}
          error={formState.errors["password"] ?? undefined}
        />
        <StepInput
          label="Confirm password"
          placeholder="Confirm your password"
          inputProps={{ type: "password" }}
          {...register("confirmPassword")}
          error={formState.errors["confirmPassword"] ?? undefined}
        />
        <Button
          disabled={signUpResponse.type === "pending" || authData.authenticated}
          className="auth-form__submit"
          type="submit"
          size="lg"
        >
          Submit
        </Button>
        <Typography>
          Already have an account?{" "}
          <Link
            href={{
              pathname: "/",
              query: {
                modal: MODAL_WINDOW.SIGN_IN,
                redirect: router.query.redirect,
              },
            }}
          >
            Sign in here
          </Link>
        </Typography>
      </form>
    </ModalWindow>
  );
};
