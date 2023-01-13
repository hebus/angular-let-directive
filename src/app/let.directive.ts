import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface LetViewContext<T> {
  $implicit: T;
  sqLet: T;
  complete: boolean;
}

@Directive({
  selector: '[sqLet]',
})
export class LetDirective<T> {
  private readonly viewContext: LetViewContext<T | undefined> = {
    $implicit: undefined,
    sqLet: undefined,
    complete: false,
  };

  @Input()
  set sqLet(type: T) {
    this.viewContext.$implicit = type;
    this.viewContext.sqLet = type;
    // wait 3s before updating the complete state
    setTimeout(() => (this.viewContext.complete = true), 3000);
    this.renderMainView();
  }

  constructor(
    private readonly mainTemplateRef: TemplateRef<
      LetViewContext<T | undefined>
    >,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  private renderMainView() {
    this.viewContainerRef.createEmbeddedView(
      this.mainTemplateRef,
      this.viewContext
    );
  }
}
