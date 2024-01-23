import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
	selector: '[appConfirm]',
	standalone: true,
	providers: [ConfirmationService],
	imports: [ConfirmPopupModule],
	template: '<p-confirmPopup></p-confirmPopup>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
	protected readonly confirmationService: ConfirmationService = inject(ConfirmationService);

	public $message = input<string>('Potvrdit', { alias: 'confirmMessage' });

	@Output('confirm')
	public confirm: EventEmitter<MouseEvent> = new EventEmitter();

	@HostListener('click', ['$event'])
	public onClick(event: MouseEvent) {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: this.$message(),
			acceptLabel: 'Ano',
			rejectLabel: 'Ne',
			accept: () => {
				this.confirm.emit(event);
			},
			reject: () => {},
		});
	}
}
