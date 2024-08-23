import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderSignalrService {
  // public hubConnection!: signalR.HubConnection;
  public hubConnection!: HubConnection;
  public startConnection = () => {
   
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://carrentalapi-aeauh6axhtcub6df.centralindia-01.azurewebsites.net/cart', {
      skipNegotiation: true, // Ensure credentials are included,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(LogLevel.Information)
    .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
}
