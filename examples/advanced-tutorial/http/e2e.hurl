# ============================================================================
# Advanced Tutorial — End-to-End HTTP test
#
# Prerequisites:
#   1. MongoDB running on mongodb://127.0.0.1:27017
#   2. `deno task seed`  (creates ghost admin + drops the DB)
#   3. `deno task start` (Lesan server on http://localhost:1380)
#   4. `deno task test`  (this file)
#
# The ghost superuser (isGhost) bypasses every role/feature check, so a single
# token can drive the whole procurement workflow end-to-end.
# ============================================================================

# ---------------------------------------------------------------- 0. login --
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "user",
  "act": "login",
  "details": {
    "set": {
      "email": "ghost@medsupply.io",
      "password": "GhostPass123!"
    },
    "get": {
      "token": "t",
      "user": {
        "_id": 1,
        "first_name": 1,
        "last_name": 1,
        "email": 1,
        "roles": 1
      }
    }
  }
}
HTTP 200
[Captures]
token: jsonpath "$.body.token"
ghostUserId: jsonpath "$.body.user._id"
ghostRoleId: jsonpath "$.body.user.roles[0].roleId"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.user.email" == "ghost@medsupply.io"

# -------------------------------------------------- 1. organization ---------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "organization",
  "act": "addOrganization",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Central Hospital",
      "code": "ORG-001",
      "description": "Main hospital tenant"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "code": 1
    }
  }
}
HTTP 200
[Captures]
orgId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.code" == "ORG-001"

# ------------------------------------------------------- 2. unit ------------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "unit",
  "act": "addUnit",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Purchasing Department",
      "code": "UNIT-PUR",
      "type": "Department",
      "organization": "{{orgId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "code": 1
    }
  }
}
HTTP 200
[Captures]
unitPurchasingId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.code" == "UNIT-PUR"

# ---------------------------------------------------- 2b. warehouse unit ----
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "unit",
  "act": "addUnit",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Central Warehouse",
      "code": "UNIT-WH",
      "type": "Warehouse",
      "organization": "{{orgId}}"
    },
    "get": {
      "_id": 1,
      "name": 1
    }
  }
}
HTTP 200
[Captures]
unitWarehouseId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true

# ------------------------------------------------------- 3. product ---------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "product",
  "act": "addProduct",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "TSH Lab Kit",
      "code": "PRD-001",
      "price": 250000,
      "unit": "pack"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "code": 1,
      "price": 1
    }
  }
}
HTTP 200
[Captures]
productId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.code" == "PRD-001"

# ---------------------------------------------------------- 4. tag ----------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "tag",
  "act": "addTag",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Medical",
      "color": "#ff5252"
    },
    "get": {
      "_id": 1,
      "name": 1
    }
  }
}
HTTP 200
[Captures]
tagId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.name" == "Medical"

# ------------------------------------------------- 4b. tag on product ------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "product",
  "act": "updateProductRelations",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{productId}}",
      "tags": ["{{tagId}}"]
    },
    "get": {
      "_id": 1,
      "tags": { "_id": 1, "name": 1 }
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.tags[0].name" == "Medical"

# ------------------------------------------------------ 5. stores -----------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "store",
  "act": "addStore",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Central Warehouse Store",
      "code": "ST-01",
      "unit": "{{unitWarehouseId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "code": 1
    }
  }
}
HTTP 200
[Captures]
storeId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "store",
  "act": "addStore",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Pharmacy Store",
      "code": "ST-02",
      "unit": "{{unitWarehouseId}}"
    },
    "get": {
      "_id": 1,
      "name": 1
    }
  }
}
HTTP 200
[Captures]
store2Id: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true

# ------------------------------------------------------ 6. inventory --------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "inventory",
  "act": "addStock",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "storeId": "{{storeId}}",
      "productId": "{{productId}}",
      "quantity": 100,
      "reason": "goods_receipt"
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.balanceAfter" == 100

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "inventory",
  "act": "getInventories",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "storeId": "{{storeId}}"
    },
    "get": {
      "_id": 1,
      "quantity": 1,
      "store": { "_id": 1, "name": 1 },
      "product": { "_id": 1, "name": 1 }
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body[0].quantity" == 100
jsonpath "$.body[0].product.name" == "TSH Lab Kit"

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "inventory",
  "act": "getStockLevel",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "storeId": "{{storeId}}",
      "productId": "{{productId}}"
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.quantity" == 100

# ---------------------------------------------- 6b. transfer between stores
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "inventory",
  "act": "transferStock",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "fromStoreId": "{{storeId}}",
      "toStoreId": "{{store2Id}}",
      "productId": "{{productId}}",
      "quantity": 30
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.quantity" == 30

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "stockMovement",
  "act": "getStockMovements",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "productId": "{{productId}}"
    },
    "get": {
      "_id": 1,
      "quantity": 1,
      "reason": 1,
      "balanceBefore": 1,
      "balanceAfter": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body" count >= 2

# ------------------------------------------------------- 7. process ---------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "process",
  "act": "addProcess",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Medical Equipment Purchase",
      "description": "Two-step approval workflow",
      "status": "Draft",
      "organization": "{{orgId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "status": 1
    }
  }
}
HTTP 200
[Captures]
processId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Draft"

# ------------------------------------------------ 7b. process steps ---------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "processStep",
  "act": "addProcessStep",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Purchasing Approval",
      "stepType": "Approval",
      "order": 1,
      "groupsOperator": "OR",
      "assigneeGroups": [
        { "operator": "OR", "unitIds": ["{{unitPurchasingId}}"] }
      ],
      "process": "{{processId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "order": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "processStep",
  "act": "addProcessStep",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "name": "Finance Review",
      "stepType": "Approval",
      "order": 2,
      "groupsOperator": "OR",
      "assigneeGroups": [
        { "operator": "OR", "unitIds": ["{{unitWarehouseId}}"] }
      ],
      "process": "{{processId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "order": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true

# ----------------------------------------------- 7c. activate the process --
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "process",
  "act": "activateProcess",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{processId}}"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "status": 1,
      "isActive": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Active"

# ------------------------------------------------------ 8. budgetLine -------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "budgetLine",
  "act": "addBudgetLine",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "code": "BL-2024-01",
      "title": "Laboratory Consumables",
      "year": 2024,
      "totalAllocated": 100000000,
      "organization": "{{orgId}}"
    },
    "get": {
      "_id": 1,
      "code": 1,
      "totalAllocated": 1,
      "remainingBudget": 1
    }
  }
}
HTTP 200
[Captures]
budgetLineId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.remainingBudget" == 100000000

# --------------------------------------------------------- 9. tender --------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "tender",
  "act": "addTender",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "title": "TSH Kit Supply Tender",
      "status": "Open",
      "organization": "{{orgId}}"
    },
    "get": {
      "_id": 1,
      "title": 1,
      "status": 1
    }
  }
}
HTTP 200
[Captures]
tenderId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Open"

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "tender",
  "act": "addOffer",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "tenderId": "{{tenderId}}",
      "supplier": "ZistShimi",
      "price": 240000,
      "score": 92,
      "submittedAt": "2024-06-20T10:00:00Z"
    },
    "get": {
      "_id": 1,
      "offers": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.offers[0].supplier" == "ZistShimi"

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "tender",
  "act": "award",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "tenderId": "{{tenderId}}",
      "supplier": "ZistShimi"
    },
    "get": {
      "_id": 1,
      "status": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Awarded"

# -------------------------------------------- 10. purchase order ------------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "add",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "title": "Purchase 100 TSH kits",
      "description": "Bulk order for laboratory",
      "estimatedAmount": 25000000,
      "status": "Draft",
      "requester": "{{ghostUserId}}",
      "organization": "{{orgId}}",
      "requestingUnit": "{{unitPurchasingId}}",
      "product": "{{productId}}",
      "budgetLine": "{{budgetLineId}}"
    },
    "get": {
      "_id": 1,
      "title": 1,
      "status": 1,
      "currentStep": 1,
      "history": 1
    }
  }
}
HTTP 200
[Captures]
poId: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Draft"
jsonpath "$.body.history[0].action" == "created"

# ---------------------------------------------- 10b. gets / count -----------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "gets",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "status": "Draft",
      "page": 1,
      "limit": 10
    },
    "get": {
      "_id": 1,
      "title": 1,
      "status": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.items[0]._id" == "{{poId}}"
jsonpath "$.body.total" == 1

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "count",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "status": "Draft"
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.count" == 1

# --------------------------------------------- 10c. submit the order --------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "submit",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{poId}}"
    },
    "get": {
      "_id": 1,
      "title": 1,
      "status": 1,
      "currentStep": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "InProgress"
jsonpath "$.body.currentStep" == 1

# check budget encumbrance was created
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "budgetLine",
  "act": "getBudgetLineBreakdown",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{budgetLineId}}"
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.totalEncumbered" == 25000000

# ------------------------------------------------ 11. step approvals --------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "stepApproval",
  "act": "getStepApprovals",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "purchaseOrderId": "{{poId}}"
    },
    "get": {
      "_id": 1,
      "status": 1,
      "processStep": { "_id": 1, "order": 1 },
      "unit": { "_id": 1, "name": 1 }
    }
  }
}
HTTP 200
[Captures]
approvalStep1Id: jsonpath "$.body[0]._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body[0].status" == "pending"

# approve step 1 -> advances to step 2
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "stepApproval",
  "act": "submitDecision",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "approvalId": "{{approvalStep1Id}}",
      "decision": "approved",
      "comment": "Approved. Stock is sufficient."
    },
    "get": {
      "_id": 1,
      "status": 1,
      "currentStep": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "InProgress"
jsonpath "$.body.currentStep" == 2

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "stepApproval",
  "act": "getStepApprovals",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "purchaseOrderId": "{{poId}}"
    },
    "get": {
      "_id": 1,
      "status": 1,
      "processStep": { "_id": 1, "order": 1 },
      "unit": { "_id": 1, "name": 1 }
    }
  }
}
HTTP 200
[Captures]
approvalStep2Id: jsonpath "$.body[1]._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body" count == 2

# approve step 2 -> order approved
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "stepApproval",
  "act": "submitDecision",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "approvalId": "{{approvalStep2Id}}",
      "decision": "approved",
      "comment": "Finance ok."
    },
    "get": {
      "_id": 1,
      "status": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Approved"

# --------------------------------------------------- 12. finalize -----------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "finalize",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{poId}}"
    },
    "get": {
      "_id": 1,
      "title": 1,
      "status": 1,
      "completedAt": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Completed"

# --------------------------------------------------- 13. history ------------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "getHistory",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{poId}}"
    },
    "get": {
      "_id": 1,
      "title": 1,
      "history": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.history[3].performed.name" exists

# ----------------------------------------------- 14. cancel path ------------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "add",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "title": "Cancel me",
      "estimatedAmount": 5000000,
      "status": "Draft",
      "requester": "{{ghostUserId}}",
      "organization": "{{orgId}}",
      "requestingUnit": "{{unitPurchasingId}}",
      "product": "{{productId}}",
      "budgetLine": "{{budgetLineId}}"
    },
    "get": {
      "_id": 1,
      "status": 1
    }
  }
}
HTTP 200
[Captures]
po2Id: jsonpath "$.body._id"
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Draft"

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "submit",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{po2Id}}"
    },
    "get": {
      "_id": 1,
      "status": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "InProgress"

POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "purchaseOrder",
  "act": "cancel",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{po2Id}}",
      "reason": "Budget freeze"
    },
    "get": {
      "_id": 1,
      "status": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.status" == "Cancelled"

# po1 finalized -> 25000000 moved from encumbered to spent; po2 cancel released its encumbrance
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "budgetLine",
  "act": "getBudgetLineBreakdown",
  "details": {
    "set": {
      "activeRoleId": "ghost-role",
      "_id": "{{budgetLineId}}"
    },
    "get": {}
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.totalEncumbered" == 0
jsonpath "$.body.totalSpent" == 25000000
jsonpath "$.body.remainingBudget" == 75000000

# ------------------------------------------- 15. dashboard statistic -------
POST {{baseUrl}}/lesan
Content-Type: application/json
token: {{token}}
{
  "model": "user",
  "act": "dashboardStatistic",
  "details": {
    "set": {
      "activeRoleId": "{{ghostRoleId}}"
    },
    "get": {
      "purchasingOrderCounts": 1,
      "pendingApprovalCount": 1,
      "inventoryLowStock": 1
    }
  }
}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.body.purchasingOrderCounts.total" == 2
jsonpath "$.body.purchasingOrderCounts.completed" == 1
