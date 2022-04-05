defmodule MusicPlaylist.MusicsTest do
  use MusicPlaylist.DataCase

  alias MusicPlaylist.Musics

  describe "musics" do
    alias MusicPlaylist.Musics.Music

    import MusicPlaylist.MusicsFixtures

    @invalid_attrs %{active: nil, image_url: nil, name: nil}

    test "list_musics/0 returns all musics" do
      music = music_fixture()
      assert Musics.list_musics() == [music]
    end

    test "get_music!/1 returns the music with given id" do
      music = music_fixture()
      assert Musics.get_music!(music.id) == music
    end

    test "create_music/1 with valid data creates a music" do
      valid_attrs = %{active: true, image_url: "some image_url", name: "some name"}

      assert {:ok, %Music{} = music} = Musics.create_music(valid_attrs)
      assert music.active == true
      assert music.image_url == "some image_url"
      assert music.name == "some name"
    end

    test "create_music/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Musics.create_music(@invalid_attrs)
    end

    test "update_music/2 with valid data updates the music" do
      music = music_fixture()
      update_attrs = %{active: false, image_url: "some updated image_url", name: "some updated name"}

      assert {:ok, %Music{} = music} = Musics.update_music(music, update_attrs)
      assert music.active == false
      assert music.image_url == "some updated image_url"
      assert music.name == "some updated name"
    end

    test "update_music/2 with invalid data returns error changeset" do
      music = music_fixture()
      assert {:error, %Ecto.Changeset{}} = Musics.update_music(music, @invalid_attrs)
      assert music == Musics.get_music!(music.id)
    end

    test "delete_music/1 deletes the music" do
      music = music_fixture()
      assert {:ok, %Music{}} = Musics.delete_music(music)
      assert_raise Ecto.NoResultsError, fn -> Musics.get_music!(music.id) end
    end

    test "change_music/1 returns a music changeset" do
      music = music_fixture()
      assert %Ecto.Changeset{} = Musics.change_music(music)
    end
  end

  describe "music_plans" do
    alias MusicPlaylist.Musics.MusicPlan

    import MusicPlaylist.MusicsFixtures

    @invalid_attrs %{}

    test "list_music_plans/0 returns all music_plans" do
      music_plan = music_plan_fixture()
      assert Musics.list_music_plans() == [music_plan]
    end

    test "get_music_plan!/1 returns the music_plan with given id" do
      music_plan = music_plan_fixture()
      assert Musics.get_music_plan!(music_plan.id) == music_plan
    end

    test "create_music_plan/1 with valid data creates a music_plan" do
      valid_attrs = %{}

      assert {:ok, %MusicPlan{} = music_plan} = Musics.create_music_plan(valid_attrs)
    end

    test "create_music_plan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Musics.create_music_plan(@invalid_attrs)
    end

    test "update_music_plan/2 with valid data updates the music_plan" do
      music_plan = music_plan_fixture()
      update_attrs = %{}

      assert {:ok, %MusicPlan{} = music_plan} = Musics.update_music_plan(music_plan, update_attrs)
    end

    test "update_music_plan/2 with invalid data returns error changeset" do
      music_plan = music_plan_fixture()
      assert {:error, %Ecto.Changeset{}} = Musics.update_music_plan(music_plan, @invalid_attrs)
      assert music_plan == Musics.get_music_plan!(music_plan.id)
    end

    test "delete_music_plan/1 deletes the music_plan" do
      music_plan = music_plan_fixture()
      assert {:ok, %MusicPlan{}} = Musics.delete_music_plan(music_plan)
      assert_raise Ecto.NoResultsError, fn -> Musics.get_music_plan!(music_plan.id) end
    end

    test "change_music_plan/1 returns a music_plan changeset" do
      music_plan = music_plan_fixture()
      assert %Ecto.Changeset{} = Musics.change_music_plan(music_plan)
    end
  end
end
