import os
import anthropic
import dotenv

dotenv.load_dotenv()


def load_book():
    with open("book.txt") as f:
        return f.read()


def main(max_tokens_to_sample: int = 100):
    c = anthropic.Client(os.environ["ANTHROPIC_API_KEY"])
    book = load_book()
    resp = c.completion(
        prompt=f"""{anthropic.HUMAN_PROMPT} Given book {book} 
        
        What was the publicaiton year?{anthropic.AI_PROMPT}""",
        stop_sequences=[anthropic.HUMAN_PROMPT],
        model="claude-instant-v1-100k",
        max_tokens_to_sample=max_tokens_to_sample,
    )
    print(resp)


if __name__ == "__main__":
    main()
