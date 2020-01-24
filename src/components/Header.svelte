<script>
  import { onMount } from "svelte";
  import { auth, reader } from "../database";
  import { user } from "../store";

  let loginUser = {
    email: "",
    password: ""
  };

  async function login() {
    const result = await auth.login(loginUser);
    const details = await reader.getUserByUserId(result.user.uid);
    localStorage.setItem("ys-login", btoa(JSON.stringify(loginUser)));
    user.set({ ...result.user, ...details });
  }

  async function logout() {
    await auth.logout();
    localStorage.removeItem("ys-login");
    loginUser = { email: "", password: "" };
    user.set(null);
  }

  onMount(async () => {
    const cryptedUser = localStorage.getItem("ys-login");
    if (!cryptedUser) {
      return;
    }

    const user = JSON.parse(atob(cryptedUser));
    if (!user) {
      return;
    }

    loginUser = user;
    await login();
  });
</script>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 4px 8px;
    background: lightsteelblue;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }

  header > h2 {
    letter-spacing: 0.1em;
  }

  .ctrl {
    box-sizing: border-box;
    padding: 8px;
    font-size: medium;
    border: 1px solid steelblue;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    background: inherit;
  }

  .ctrl:hover,
  .ctrl:focus {
    border: 1px solid lightgray;
  }

  .ctrl_input {
    width: 250px;
  }

  .ctrl_button {
    text-transform: uppercase;
    cursor: pointer;
  }
</style>

<header>
  <h2>Scoreboard</h2>
  <div>
    <input
      bind:value={loginUser.email}
      class="ctrl ctrl_input"
      type="text"
      placeholder="enter your email" />
    <input
      bind:value={loginUser.password}
      class="ctrl ctrl_input"
      type="password"
      placeholder="enter your password" />
    <button class="ctrl ctrl_button" on:click={login}>login</button>
    <button class="ctrl ctrl_button" on:click={logout}>logout</button>
  </div>
</header>
