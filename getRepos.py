import requests

USERNAME = "danielyoungkimball"  # your GitHub username
OUTPUT_FILE = "github_repos.md"

def fetch_repos(username):
    url = f"https://api.github.com/users/{username}/repos?per_page=100"
    response = requests.get(url)
    return response.json()

def generate_markdown(repos):
    lines = ["# GitHub Repositories\n"]
    for repo in sorted(repos, key=lambda r: r["stargazers_count"], reverse=True):
        name = repo["name"]
        desc = repo["description"] or "No description"
        stars = repo["stargazers_count"]
        lang = repo["language"] or "N/A"
        url = repo["html_url"]
        lines.append(f"### [{name}]({url})")
        lines.append(f"*Language:* {lang}  \n*Stars:* {stars}  \n*Description:* {desc}\n")
    return "\n".join(lines)

if __name__ == "__main__":
    repos = fetch_repos(USERNAME)
    md = generate_markdown(repos)
    with open(OUTPUT_FILE, "w") as f:
        f.write(md)
    print(f"Exported to {OUTPUT_FILE}")