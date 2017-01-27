import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateComponent } from './create';
import { InfoComponent } from './info';

export const usersRoutes: Routes = [
	{
		path: 'users',
		component: UsersComponent,
		children: [
			{
				path: 'create',
				component: CreateComponent
			},
			{
				path: 'info',
				component: InfoComponent,
				data: {
					action: 'add'
				}
			}
		]
	}
];
