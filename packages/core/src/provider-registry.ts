import type { ProviderDescriptor } from "./types.js";

export class ProviderRegistry {
  private readonly providers = new Map<string, ProviderDescriptor>();

  addProvider(descriptor: ProviderDescriptor): void {
    this.providers.set(descriptor.providerId, descriptor);
  }

  get(providerId: string): ProviderDescriptor | undefined {
    return this.providers.get(providerId);
  }

  isAcceptedEpoch(providerId: string, epoch: number): boolean {
    const provider = this.providers.get(providerId);
    if (!provider) return false;
    return provider.issuedEpochs.includes(epoch);
  }
}
