/**
 * The history controller provides an ring-buffer
 */
export class HistoryController {
  constructor(private size: number) {}

  public entries: string[] = [];
  private cursor = 0;

  /**
   * Push an entry and maintain ring buffer size
   */
  push(entry: string): void {
    // Skip empty entries
    if (entry.trim() === "") return;
    // Skip duplicate entries
    const lastEntry = this.entries[this.entries.length - 1];
    if (entry === lastEntry) {
      this.cursor = this.entries.length;
      return;
    }
    // Keep track of entries
    this.entries.push(entry);
    if (this.entries.length > this.size) {
      this.entries.shift();
    }
    this.cursor = this.entries.length;
  }

  /**
   * Rewind history cursor on the last entry
   */
  rewind(): void {
    this.cursor = this.entries.length;
  }

  /**
   * Returns the previous entry
   */
  getPrevious(): string {
    const idx = Math.max(0, this.cursor - 1);
    this.cursor = idx;
    return this.entries[idx];
  }

  /**
   * Returns the next entry
   */
  getNext(): string {
    const idx = Math.min(this.entries.length, this.cursor + 1);
    this.cursor = idx;
    return this.entries[idx];
  }
}
