import axios from "axios";
import type { Car, User } from "@/app/global/types/global";
import type { Signup } from "@/app/global/types/global";
import type { Login } from "@/app/global/types/global";
import type { UpdateUser } from "@/app/global/types/global";
import type { ForgotPassword } from "@/app/global/types/global";
import type { ResetPassword } from "@/app/global/types/global";
import type { Location } from "../(features)/locationlist/hooks/useFilterLocations";
import type { AddCar } from "@/app/global/types/global";
// globalt kald
axios.defaults.withCredentials = true;


// Base URL for the Flask backend (set in .env). Runs client-side, so it must be NEXT_PUBLIC_.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BACKEND_URL) {
  throw Error("Cannot find path")
}

// Session
export async function api_user(): Promise<User> {
  const response = await axios.get(`${BACKEND_URL}/api-user`);
  return response.data.user;
}

// funktion til at kunne fetche fra vores backend asynkronsk
// bruger searchparams til at kunne omdanne til body
export async function create_user(data: Signup) {
  const response = await axios.post(
    `${BACKEND_URL}/api-signup`,
    // body argument
    new URLSearchParams(data),
  );
  return response.data; // backend der sender JSON retur
}

// Get the user from the api-login in the backend
export async function login_user(data: Login) {
  const response = await axios.post(
    `${BACKEND_URL}/api-login`,
    // body argument
    new URLSearchParams(data),
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

// Opdatere bruger
export async function update_user(data: UpdateUser) {
  const response = await axios.patch(
    `${BACKEND_URL}/api-user`,
    new URLSearchParams(data),
  );

  return response.data;
}

// Glemt Password
export async function forgot_password(data: ForgotPassword) {
  const response = await axios.post(
    `${BACKEND_URL}/forgot-password`,
    new URLSearchParams(data),
  );
  return response.data;
}

//Reset password
export async function reset_password(data: ResetPassword) {
  const response = await axios.patch(
    `${BACKEND_URL}/reset-password`,
    new URLSearchParams(data),
  );
  return response.data;
}

// Slet bruger
export async function delete_user() {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${BACKEND_URL}/delete-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
// Logout
export async function logout() {
  await axios.post(`${BACKEND_URL}/logout`);
  localStorage.removeItem("token");
}

// locations
// Uses fetch (not axios) with host.docker.internal because this runs server-side inside the Next.js Docker container.
// From inside the container, localhost refers to the container itself — not the Flask service.
// host.docker.internal escapes the container and reaches the backend on the host machine.
// Axios calls use http://localhost because they run client-side in the browser, where localhost is the host machine.
export async function getEventLocations(): Promise<Location[]> {
  // Falls back to BACKEND_URL when running outside Docker (e.g. plain `npm run dev`)
  const SERVER_BACKEND_URL = process.env.BACKEND_INTERNAL_URL ?? BACKEND_URL;
  const response = await fetch(
    `${SERVER_BACKEND_URL}/api-get-all-locations`,
    { method: "GET", cache: "no-store" },
  );

  const data = await response.json();
  return data.locations ?? [];
}

export async function getSingleLocation(location_pk: string) {
  const response = await axios.get(
    `${BACKEND_URL}/api-get-location/${location_pk}`,
  );
  return response.data.location;
}

export async function upload_avatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await axios.post(`${BACKEND_URL}/api-user/avatar`, formData);
  return response.data;
}

// Funktion til at kunne connecte til backend for at tilføje bil med axios
export async function create_car(data: AddCar) {
  const formData = new FormData();
  formData.append("car_licenseplate", data.car_licenseplate);
  if (data.car_image) {
    formData.append("car_image", data.car_image);
  }
  const response = await axios.post(`${BACKEND_URL}/api-create-car`, formData);
  return response.data;
}

export async function get_cars(): Promise<Car[]> {
  const response = await axios.get(`${BACKEND_URL}/api-get-cars`);
  return response.data.cars ?? [];
}

export async function delete_car(car_pk: string) {
  const response = await axios.delete(`${BACKEND_URL}/delete-car/${car_pk}`);
  return response.data;
}

export async function patch_car(car_pk: string) {
  const response = await axios.patch(`${BACKEND_URL}/restore-car/${car_pk}`);
  return response.data;
}
