import { Component, Inject, Input } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { ManagerModel } from '../../models/manager.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../../modules/pipe-line/pipe-line.module';

@Component({
  selector: 'app-dialog-manager',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, PipeModule],
  templateUrl: './dialog-manager.component.html',
  styleUrl: './dialog-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogManagerComponent {
  manager: ManagerModel | undefined;
  newDescription: string | undefined;


  isEditing: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) private data: { manager: ManagerModel }, private api: ApiService) {
    this.manager = data.manager; // Recebe o manager do diálogo
    this.newDescription = this.manager?.description;
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  async save() {
    if (this.newDescription !== undefined) {
      try {
        await this.api.changeDescription(this.manager!.id, this.newDescription); // Chama o serviço para atualizar a descrição
        console.log('Descrição atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar a descrição:', error);
      }
      this.toggleEditing(); // Desativa o modo de edição após salvar
    }
  }
}
