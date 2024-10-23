import { Component, inject } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogManagerComponent } from '../../components/dialog-manager/dialog-manager.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddManagerComponent } from '../../components/dialog-add-manager/dialog-add-manager.component';
import { ApiService } from '../../services/api.service';
import { ManagerModel } from '../../models/manager.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatButtonModule, MatIconModule, MatDialogModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private api: ApiService) { }

  managers: ManagerModel[] = [];

  ngOnInit(): void {
    this.fetchManagers();
  }

  private async fetchManagers(): Promise<void> {
    try {
      const response = await this.api.getManagers();
      if (response.success) {
        this.managers = response.data || [];
        this.managers.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
        this.updatePositions();
      } else {
        console.error('Error message:', response.msg);
      }
    } catch (err) {
      console.error('Error catching:', err);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.managers, event.previousIndex, event.currentIndex);

    this.managers.forEach((manager, index) => {
      manager.rank = index + 1;  // Atualiza o rank de acordo com a nova posição
    });

    this.updatePositions();
  }

  updatePositions() {
    const updates = this.managers.map((item, index) => ({
      id: item.id,
      position: index + 1
    }));

    this.api.changePosition(updates).catch(error => {
      console.error('Failed to update positions:', error);
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(manager: ManagerModel) {
    const dialogRef = this.dialog.open(DialogManagerComponent, {
      data: {manager}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.fetchManagers();
    });
  }

  openDialogAddManager() {
    const dialogAddMan = this.dialog.open(DialogAddManagerComponent);
    dialogAddMan.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getRankColor(rank: number): string {
    if (rank === 1) {
      return '#bb8926'; 
    } else if (rank === 2) {
      return '#758694'; 
    } else if (rank === 3) {
      return '#825B32';
    } else {
      return 'black';
    }
  }
}
