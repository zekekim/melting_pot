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
    print(git_dir)

    ## Find branchnames
    head_dir = os.path.join(git_dir, 'refs/heads')
    obj_dir = os.path.join(git_dir, 'objects')

    for dirpath, dirname, filenames in os.walk(head_dir):
        for filename in filenames:
            with open(os.path.join(dirpath, filename), 'r') as file:
                commit_hash = file.read().rstrip()
                node = CommitNode(commit_hash)
                hash_obj_dir = commit_hash[0:2]
                compressed_contents = open(os.path.join(obj_dir, hash_obj_dir + "/" + commit_hash[2:]), 'rb').read()
                decompressed_contents = zlib.decompress(compressed_contents)
                print(decompressed_contents)

if __name__ == "__main__":
    main()
