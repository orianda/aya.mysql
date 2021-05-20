export interface Binding {

  bind(parameter: string, value: string): this;

  bind(parameter: Record<string, string>): this;
}
