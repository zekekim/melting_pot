import os
import sys
import zlib

git = '.git'

class CommitNode:
    def __init__(self, commit_hash):
        """
        :type commit_hash: str
        """
        self.commit_hash = commit_hash
        self.parents = set()
        self.children = set()


def main():
    while True:
        cur_dir = os.getcwd()
        file_list = os.listdir(cur_dir)

        if git not in file_list:
            if cur_dir == '/':
                sys.stderr.write('Not inside a Git repository')
                sys.exit(1)
        else:
            break
    git_dir = os.path.join(cur_dir, '.git')

    ## Find branchnames
    head_dir = os.path.join(git_dir, 'refs/heads')
    obj_dir = os.path.join(git_dir, 'objects')
    root_commits = set()
    commits = {}
    branch_heads = {}

    for dirpath, dirname, filenames in os.walk(head_dir):
        for filename in filenames:
            with open(os.path.join(dirpath, filename), 'r') as file:
                branch_name = os.path.join(dirpath, filename)[len(head_dir) + 1:]
                commit_hash = file.read().rstrip()
                root_commits.add(commit_hash)
                if commit_hash not in branch_heads:
                    branch_heads[commit_hash] = [branch_name]
                else:
                    branch_heads[commit_hash].append(branch_name)
                dfs(root_commits, commits, obj_dir, commit_hash, "")
    root_commits = sorted(root_commits)
    sorted_commits = topo_sort(root_commits, commits)
    index = 0
    print_commits(sorted_commits, branch_heads, commits)


def dfs(root_commits, commits, obj_dir, hash, child):
    node = CommitNode(hash)
    commits[hash] = node
    found_parent = False
    if child != "":
        node.children.add(child)
    curr_dir = os.path.join(obj_dir, hash[0:2] + "/" + hash[2:])
    if not os.path.exists(curr_dir):
        return
    compressed_contents = open(curr_dir, 'rb').read()
    decompressed_contents = zlib.decompress(compressed_contents).decode('latin-1')
    for line in decompressed_contents.split('\n'):
        words = line.split(' ')
        if words[0] == 'parent':
            found_parent = True
            node.parents.add(words[1])
            dfs(root_commits, commits, obj_dir, words[1], hash)
    if not found_parent:
        root_commits.add(hash)
        return

def topo_sort(root_commits, commits):
    stack = list(commits[hash] for hash in list(root_commits))
    visited = set()
    L = []
    while stack:
        if stack[0] not in visited:

            visited.add(stack[0])
            node = stack[0]
            for parent in node.parents:
                if parent not in visited:
                    visited.add(parent)
                    stack.append(commits[parent])
            L.append(stack[0].commit_hash)
        stack = stack[1:]
    return L

def print_commits(sorted_commits, branch_heads, commits):
    index = 0
    while index < len(sorted_commits):
        commit_hash = sorted_commits[index]
        print(commit_hash, end=' ')
        if commit_hash in branch_heads.keys():
            branches = branch_heads[commit_hash]
            for branch in branches:
                print(branch, end=' ')
        if (index + 1 < len(sorted_commits) and sorted_commits[index + 1] not in commits[commit_hash].parents):
            print('=' + '\n' + '\n' + '=', end=' ')
            for child in commits[sorted_commits[index + 1]].children:
                print(child, end = ' ')
        print('')
        index = index + 1




if __name__ == "__main__":
    main()


    # commit parent-> commit2 parent ->commit3
    # commit.parents = [commit2, commit3]
