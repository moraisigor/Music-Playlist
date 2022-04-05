defmodule MusicPlaylist.PlansTest do
  use MusicPlaylist.DataCase

  alias MusicPlaylist.Plans

  describe "plans" do
    alias MusicPlaylist.Plans.Plan

    import MusicPlaylist.PlansFixtures

    @invalid_attrs %{active: nil, image_url: nil, music_limit: nil, name: nil}

    test "list_plans/0 returns all plans" do
      plan = plan_fixture()
      assert Plans.list_plans() == [plan]
    end

    test "get_plan!/1 returns the plan with given id" do
      plan = plan_fixture()
      assert Plans.get_plan!(plan.id) == plan
    end

    test "create_plan/1 with valid data creates a plan" do
      valid_attrs = %{active: true, image_url: "some image_url", music_limit: 42, name: "some name"}

      assert {:ok, %Plan{} = plan} = Plans.create_plan(valid_attrs)
      assert plan.active == true
      assert plan.image_url == "some image_url"
      assert plan.music_limit == 42
      assert plan.name == "some name"
    end

    test "create_plan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Plans.create_plan(@invalid_attrs)
    end

    test "update_plan/2 with valid data updates the plan" do
      plan = plan_fixture()
      update_attrs = %{active: false, image_url: "some updated image_url", music_limit: 43, name: "some updated name"}

      assert {:ok, %Plan{} = plan} = Plans.update_plan(plan, update_attrs)
      assert plan.active == false
      assert plan.image_url == "some updated image_url"
      assert plan.music_limit == 43
      assert plan.name == "some updated name"
    end

    test "update_plan/2 with invalid data returns error changeset" do
      plan = plan_fixture()
      assert {:error, %Ecto.Changeset{}} = Plans.update_plan(plan, @invalid_attrs)
      assert plan == Plans.get_plan!(plan.id)
    end

    test "delete_plan/1 deletes the plan" do
      plan = plan_fixture()
      assert {:ok, %Plan{}} = Plans.delete_plan(plan)
      assert_raise Ecto.NoResultsError, fn -> Plans.get_plan!(plan.id) end
    end

    test "change_plan/1 returns a plan changeset" do
      plan = plan_fixture()
      assert %Ecto.Changeset{} = Plans.change_plan(plan)
    end
  end

  describe "plan_hierarchies" do
    alias MusicPlaylist.Plans.PlanHierarchy

    import MusicPlaylist.PlansFixtures

    @invalid_attrs %{}

    test "list_plan_hierarchies/0 returns all plan_hierarchies" do
      plan_hierarchy = plan_hierarchy_fixture()
      assert Plans.list_plan_hierarchies() == [plan_hierarchy]
    end

    test "get_plan_hierarchy!/1 returns the plan_hierarchy with given id" do
      plan_hierarchy = plan_hierarchy_fixture()
      assert Plans.get_plan_hierarchy!(plan_hierarchy.id) == plan_hierarchy
    end

    test "create_plan_hierarchy/1 with valid data creates a plan_hierarchy" do
      valid_attrs = %{}

      assert {:ok, %PlanHierarchy{} = plan_hierarchy} = Plans.create_plan_hierarchy(valid_attrs)
    end

    test "create_plan_hierarchy/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Plans.create_plan_hierarchy(@invalid_attrs)
    end

    test "update_plan_hierarchy/2 with valid data updates the plan_hierarchy" do
      plan_hierarchy = plan_hierarchy_fixture()
      update_attrs = %{}

      assert {:ok, %PlanHierarchy{} = plan_hierarchy} = Plans.update_plan_hierarchy(plan_hierarchy, update_attrs)
    end

    test "update_plan_hierarchy/2 with invalid data returns error changeset" do
      plan_hierarchy = plan_hierarchy_fixture()
      assert {:error, %Ecto.Changeset{}} = Plans.update_plan_hierarchy(plan_hierarchy, @invalid_attrs)
      assert plan_hierarchy == Plans.get_plan_hierarchy!(plan_hierarchy.id)
    end

    test "delete_plan_hierarchy/1 deletes the plan_hierarchy" do
      plan_hierarchy = plan_hierarchy_fixture()
      assert {:ok, %PlanHierarchy{}} = Plans.delete_plan_hierarchy(plan_hierarchy)
      assert_raise Ecto.NoResultsError, fn -> Plans.get_plan_hierarchy!(plan_hierarchy.id) end
    end

    test "change_plan_hierarchy/1 returns a plan_hierarchy changeset" do
      plan_hierarchy = plan_hierarchy_fixture()
      assert %Ecto.Changeset{} = Plans.change_plan_hierarchy(plan_hierarchy)
    end
  end
end
