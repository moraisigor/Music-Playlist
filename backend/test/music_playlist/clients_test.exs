defmodule MusicPlaylist.ClientsTest do
  use MusicPlaylist.DataCase

  alias MusicPlaylist.Clients

  describe "clients" do
    alias MusicPlaylist.Clients.Client

    import MusicPlaylist.ClientsFixtures

    @invalid_attrs %{email: nil, password_hash: nil}

    test "list_clients/0 returns all clients" do
      client = client_fixture()
      assert Clients.list_clients() == [client]
    end

    test "get_client!/1 returns the client with given id" do
      client = client_fixture()
      assert Clients.get_client!(client.id) == client
    end

    test "create_client/1 with valid data creates a client" do
      valid_attrs = %{email: "some email", password_hash: "some password_hash"}

      assert {:ok, %Client{} = client} = Clients.create_client(valid_attrs)
      assert client.email == "some email"
      assert client.password_hash == "some password_hash"
    end

    test "create_client/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Clients.create_client(@invalid_attrs)
    end

    test "update_client/2 with valid data updates the client" do
      client = client_fixture()
      update_attrs = %{email: "some updated email", password_hash: "some updated password_hash"}

      assert {:ok, %Client{} = client} = Clients.update_client(client, update_attrs)
      assert client.email == "some updated email"
      assert client.password_hash == "some updated password_hash"
    end

    test "update_client/2 with invalid data returns error changeset" do
      client = client_fixture()
      assert {:error, %Ecto.Changeset{}} = Clients.update_client(client, @invalid_attrs)
      assert client == Clients.get_client!(client.id)
    end

    test "delete_client/1 deletes the client" do
      client = client_fixture()
      assert {:ok, %Client{}} = Clients.delete_client(client)
      assert_raise Ecto.NoResultsError, fn -> Clients.get_client!(client.id) end
    end

    test "change_client/1 returns a client changeset" do
      client = client_fixture()
      assert %Ecto.Changeset{} = Clients.change_client(client)
    end
  end
end
