import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { UserList } from "./components/user-list/user-list";
import { Tasks } from './components/tasks/tasks';
import { DUMMY_USERS } from './database/dummy-users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, UserList, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tasklist-app');

  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
