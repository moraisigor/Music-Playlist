defmodule MusicPlaylist.MusicsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MusicPlaylist.Musics` context.
  """

  @doc """
  Generate a music.
  """
  def music_fixture(attrs \\ %{}) do
    {:ok, music} =
      attrs
      |> Enum.into(%{
        active: true,
        image_url: "some image_url",
        name: "some name"
      })
      |> MusicPlaylist.Musics.create_music()

    music
  end

  @doc """
  Generate a music_plan.
  """
  def music_plan_fixture(attrs \\ %{}) do
    {:ok, music_plan} =
      attrs
      |> Enum.into(%{

      })
      |> MusicPlaylist.Musics.create_music_plan()

    music_plan
  end
end
