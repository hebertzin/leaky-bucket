
export interface LeakyBucketUseCase {
  execute(userId: string, success: boolean): Promise<boolean>;
}
