defmodule MusicPlaylist.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MusicPlaylist.Accounts` context.
  """

  alias MusicPlaylist.Accounts.Admin.Repository

  @doc """
  Generate a unique admin email.
  """
  def unique_admin_email, do: "some email#{System.unique_integer([:positive])}"

  @doc """
  Generate a admin.
  """
  def admin_fixture(attrs \\ %{}) do
    {:ok, admin} =
      attrs
      |> Enum.into(%{
        email: unique_admin_email(),
        password_hash: "some password_hash"
      })
      |> Repository.create_admin()

    admin
  end
end
