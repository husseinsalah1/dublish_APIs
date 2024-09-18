type EndpointSet = Set<string>;
type PermissionsMap = Map<string, EndpointSet>;

const adminEndPoints: EndpointSet = new Set([
  "/admin/create",
  "/admin/list",
  "/admin/get",
  "/admin/update",
  "/admin/remove",
  "/admin/image",
  "/admin/password",
  "/admin/role",
]);

const roleEndPoints: EndpointSet = new Set([
  "/admin/roles/create",
  "/admin/roles/list",
  "/admin/roles/get",
  "/admin/roles/update",
  "/admin/roles/remove",
]);

const permissionEndPoints: EndpointSet = new Set(["/admin/permissions/list"]);

export const permissions: PermissionsMap = new Map();

permissions.set("admins", adminEndPoints);
permissions.set("roles", roleEndPoints);
permissions.set("permission", permissionEndPoints);

const validatePermission = (listOfPermissions: Record<string, string[]>) => {
  for (const [key, value] of Object.entries(listOfPermissions)) {
    if (!permissions.has(key)) {
      return false;
    }
    const endpointSet = permissions.get(key);
    if (!endpointSet) {
      return false;
    }
    for (const endpoint of value) {
      if (!endpointSet.has(endpoint)) {
        return false;
      }
    }
  }
  return true;
};

export default validatePermission;
