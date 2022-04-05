defmodule MusicPlaylist.PlansFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MusicPlaylist.Plans` context.
  """

  alias MusicPlaylist.Plans.{Plan, PlanHierarchy}

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
      |> Plan.Repository.create_plan()

    plan
  end

  @doc """
  Generate a plan_hierarchy.
  """
  def plan_hierarchy_fixture(attrs \\ %{}) do
    {:ok, plan_hierarchy} =
      attrs
      |> Enum.into(%{

      })
      |> PlanHierarchy.Repository.create_plan_hierarchy()

    plan_hierarchy
  end
end
