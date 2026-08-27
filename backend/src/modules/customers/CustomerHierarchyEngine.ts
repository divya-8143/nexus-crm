export interface OrganizationNode {
  id: string;
  name: string;
  accountNumber: string;
  type: 'HOLDING_COMPANY' | 'SUBSIDIARY' | 'REGIONAL_BRANCH' | 'DEPARTMENT';
  parentId?: string;
  totalAnnualRevenue: number;
  totalEmployees?: number;
  children: OrganizationNode[];
}

export class CustomerHierarchyEngine {
  public static buildTree(nodes: Array<Omit<OrganizationNode, 'children'>>): OrganizationNode[] {
    const nodeMap = new Map<string, OrganizationNode>();
    const roots: OrganizationNode[] = [];

    // Initialize map
    for (const item of nodes) {
      nodeMap.set(item.id, { ...item, children: [] });
    }

    // Construct parent-child relationships
    for (const item of nodes) {
      const current = nodeMap.get(item.id)!;
      if (item.parentId && nodeMap.has(item.parentId)) {
        const parent = nodeMap.get(item.parentId)!;
        parent.children.push(current);
      } else {
        roots.push(current);
      }
    }

    return roots;
  }

  public static calculateRollupRevenue(node: OrganizationNode): number {
    let sum = node.totalAnnualRevenue || 0;
    for (const child of node.children) {
      sum += this.calculateRollupRevenue(child);
    }
    return sum;
  }
}
