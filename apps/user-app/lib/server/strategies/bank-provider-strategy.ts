export interface BankProviderStrategy {
  supports(provider: string): boolean;
  normalizedProvider(provider: string): string;
}

class HdfcProviderStrategy implements BankProviderStrategy {
  supports(provider: string): boolean {
    return provider.toLowerCase().includes("hdfc");
  }

  normalizedProvider(_provider: string): string {
    return "HDFC Bank";
  }
}

class AxisProviderStrategy implements BankProviderStrategy {
  supports(provider: string): boolean {
    return provider.toLowerCase().includes("axis");
  }

  normalizedProvider(_provider: string): string {
    return "Axis Bank";
  }
}

export class BankProviderResolver {
  private readonly strategies: BankProviderStrategy[] = [
    new HdfcProviderStrategy(),
    new AxisProviderStrategy(),
  ];

  resolve(provider: string): string | null {
    const strategy = this.strategies.find((item) => item.supports(provider));
    return strategy ? strategy.normalizedProvider(provider) : null;
  }
}
