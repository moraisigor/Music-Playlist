defmodule MusicPlaylist.Accounts.Guardian do
  use Guardian, otp_app: :music_playlist

  alias MusicPlaylist.Accounts.Clients.Client

  def subject_for_token(%{id: id}, _claims) do
    subject = to_string(id)
    {:ok, subject}
  end

  def subject_for_token(_, _) do
    {:error, :subject_fail}
  end

  def resource_from_claims(%{"sub" => id}) do
    client = Client.Repository.get_client!(id)
    {:ok,  client}
  end

  def resource_from_claims(_claims) do
    {:error, :claims_fail}
  end


end
