/**
 * 内容生成系统
 * 核心原则：有限资源 + 确定性随机 = 无限内容
 */

/**
 * 基于种子的伪随机数生成器
 * 相同种子总是生成相同的随机数序列
 */
export class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  /**
   * 生成下一个 0-1 之间的随机数
   */
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  /**
   * 生成指定范围内的随机整数
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  /**
   * 生成指定范围内的随机浮点数
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min
  }
}

/**
 * 内容生成器
 * 从资源池中随机选择并组合内容
 */
export class ContentGenerator {
  private random: SeededRandom

  constructor(seed: number) {
    this.random = new SeededRandom(seed)
  }

  /**
   * 从资源池中随机选择一个元素
   */
  selectFrom<T>(pool: T[]): T {
    if (pool.length === 0) {
      throw new Error('Resource pool is empty')
    }
    return pool[Math.floor(this.random.next() * pool.length)]
  }

  /**
   * 从资源池中随机选择多个元素（不重复）
   */
  selectMultiple<T>(pool: T[], count: number): T[] {
    const selected: T[] = []
    const available = [...pool]
    
    for (let i = 0; i < count && available.length > 0; i++) {
      const index = Math.floor(this.random.next() * available.length)
      selected.push(available[index])
      available.splice(index, 1)
    }
    
    return selected
  }

  /**
   * 组合多个资源池
   */
  combine<T>(pools: T[][]): T[] {
    return pools.map(pool => this.selectFrom(pool))
  }

  /**
   * 生成文本（模板 + 变量替换）
   * 例如：generateText('{action} {target}!', { action: ['打倒', '支持'], target: ['敌人', '朋友'] })
   */
  generateText(template: string, variables: Record<string, string[]>): string {
    let result = template
    for (const [key, values] of Object.entries(variables)) {
      const value = this.selectFrom(values)
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
    }
    return result
  }

  /**
   * 获取随机数生成器（用于需要更多随机性的场景）
   */
  getRandom(): SeededRandom {
    return this.random
  }
}
