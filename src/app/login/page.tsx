"use client";

import { useFormState } from "react-dom";
import { loginAction, signupAction } from "./actions";
import "./login.css"; // The exact CSS from Uiverse

export default function LoginPage() {
  return (
    <div className="wrapper">
      <div className="relative flex justify-center items-center isolate">
        <label className="switch">
          <input className="toggle" type="checkbox" id="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" action={loginAction}>
                <input 
                  className="flip-card__input" 
                  name="name" 
                  placeholder="Name" 
                  type="text" 
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="password" 
                  placeholder="Password" 
                  type="password" 
                  required 
                />
                <button className="flip-card__btn" type="submit">Let&apos;s go!</button>
              </form>
            </div>
            
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" action={signupAction}>
                <input 
                  className="flip-card__input" 
                  name="name" 
                  placeholder="Name" 
                  type="text" 
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="password" 
                  placeholder="Password" 
                  type="password" 
                  required 
                  minLength={6}
                />
                <button className="flip-card__btn" type="submit">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
