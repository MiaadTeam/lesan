type StepApprovalInfo = {
  unitId: string;
  status: "pending" | "approved" | "rejected";
};

type AssigneeGroupInfo = {
  operator: "AND" | "OR";
  unitIds: string[];
};

export function evaluateStepStatus(
  approvals: StepApprovalInfo[],
  groupsOperator: "AND" | "OR",
  assigneeGroups: AssigneeGroupInfo[],
): "pending" | "approved" | "rejected" {
  const groupResults: ("pending" | "approved" | "rejected")[] = [];

  for (const group of assigneeGroups) {
    let hasApproved = false;
    let hasRejected = false;
    let hasPending = false;

    for (const unitId of group.unitIds) {
      const approval = approvals.find((a) => a.unitId === unitId);
      if (!approval) {
        hasPending = true;
      } else if (approval.status === "approved") {
        hasApproved = true;
      } else if (approval.status === "rejected") {
        hasRejected = true;
      }
    }

    if (group.operator === "AND") {
      if (hasRejected) {
        groupResults.push("rejected");
      } else if (hasPending) {
        groupResults.push("pending");
      } else if (hasApproved) {
        groupResults.push("approved");
      } else {
        groupResults.push("pending");
      }
    } else {
      if (hasApproved) {
        groupResults.push("approved");
      } else if (hasPending) {
        groupResults.push("pending");
      } else {
        groupResults.push("rejected");
      }
    }
  }

  if (groupsOperator === "AND") {
    if (groupResults.some((r) => r === "rejected")) return "rejected";
    if (groupResults.every((r) => r === "approved")) return "approved";
    return "pending";
  } else {
    if (groupResults.some((r) => r === "approved")) return "approved";
    if (groupResults.every((r) => r === "rejected")) return "rejected";
    return "pending";
  }
}
