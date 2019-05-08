import {Component, OnDestroy} from '@angular/core';
import { UserService } from './services/user.service';
import { SocketService } from './services/socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html'
})
export class AppComponent implements OnDestroy{
    constructor(private auth: UserService,
                private socket: SocketService) {
    }

    ngOnInit() {
        const potentialToken = localStorage.getItem('auth-token');
        if (potentialToken !== null) {
            this.auth.setToken(potentialToken)
        }

        this.socket.connect();
    }

    ngOnDestroy(): void {
        this.socket.disconnect();
    }
}
