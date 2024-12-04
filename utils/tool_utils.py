from data.tools import tools

def find_tool(tool_name: str) -> dict:
    """Find a tool by its name across all categories."""
    for category in tools.values():
        for tool in category:
            if tool['name'].lower() == tool_name.lower():
                return tool
    return None