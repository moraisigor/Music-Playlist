defmodule MusicPlaylist.ClientsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MusicPlaylist.Clients` context.
  """

  @doc """
  Generate a unique client email.
  """
  def unique_client_email, do: "some email#{System.unique_integer([:positive])}"

  @doc """
  Generate a client.
  """
  def client_fixture(attrs \\ %{}) do
    {:ok, client} =
      attrs
      |> Enum.into(%{
        email: unique_client_email(),
        password_hash: "some password_hash"
      })
      |> MusicPlaylist.Clients.create_client()

    client
  end
end
