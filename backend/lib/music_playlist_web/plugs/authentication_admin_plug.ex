defmodule MusicPlaylistWeb.Plugs.AuthenticationAdmin do
  import Plug.Conn

  def init(options), do: options

  def call(conn, _options) do
    conn
    |> get_token()
    |> verify_token()
    |> case do
      {:ok, user_id} ->
        conn
        |> assign(:current_user, user_id)
        |> assign(:role, :admin)
      _unauthorized ->
        conn
    end
  end

  def authenticate_admin(conn, _options) do
    IO.inspect(conn.assigns)
    if Map.get(conn.assigns, :current_user) do
      conn
    else
      conn
      |> resp(401, "")
      |> send_resp()
      |> halt()
    end
  end

  defp get_token(conn) do
    case get_req_header(conn, "authorization") do
      ["Bearer " <> token] -> token
      _ -> nil
    end
  end

  defp verify_token(nil), do: {:error, :invalid}

  defp verify_token(token) do
    case MusicPlaylist.Accounts.Admin.Guardian.decode_and_verify(token) do
      {:ok, %{"sub" => "admin@" <> id}} ->
        {:ok, id}
      _ ->
        {:error, :unauthorized, nil}
    end
  end
end
