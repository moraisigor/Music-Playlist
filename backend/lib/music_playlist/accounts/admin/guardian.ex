defmodule MusicPlaylist.Accounts.Admin.Guardian do
  use Guardian, otp_app: :music_playlist

  alias MusicPlaylist.Accounts.Admin

  def subject_for_token(%{id: id}, _claims) do
    subject = "admin@" <> to_string(id)
    {:ok, subject}
  end

  def subject_for_token(_, _) do
    {:error, :subject_fail}
  end

  def resource_from_claims(%{"sub" => "admin" <> id}) do
    admin = Admin.Repository.get_admin!(id)
    {:ok,  admin}
  end

  def resource_from_claims(_claims) do
    {:error, :claims_fail}
  end


end
