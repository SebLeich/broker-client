import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    ComponentRef,
    EmbeddedViewRef
} from '@angular/core'
import { UseCaseSelectionComponent } from '../components/use-case-selection/use-case-selection.component'

@Injectable()

export class UseCaseRenderingService {

    dialogComponentRef: ComponentRef<UseCaseSelectionComponent>

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    private appendDialogComponentToBody() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UseCaseSelectionComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRef = componentRef;
    }

    private removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
      }
}