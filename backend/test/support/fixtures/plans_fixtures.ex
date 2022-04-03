defmodule MusicPlaylist.PlansFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MusicPlaylist.Plans` context.
  """

  @doc """
  Generate a unique plan name.
  """
  def unique_plan_name, do: "some name#{System.unique_integer([:positive])}"

  @doc """
  Generate a plan.
  """
  def plan_fixture(attrs \\ %{}) do
    {:ok, plan} =
      attrs
      |> Enum.into(%{
        active: true,
        image_url: "some image_url",
        music_limit: 42,
        name: unique_plan_name()
      })
      |> MusicPlaylist.Plans.create_plan()

    plan
  end
end
