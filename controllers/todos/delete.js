import { FILE_PATH } from "../../config.js";

export default async({ response, params }) => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();


    try {
        const data = await Deno.readFile(FILE_PATH);
        const todos = JSON.parse(decoder.decode(data));

        const updateTodos = todos.filter((todo) => todo.id !== Number(params.id));

        await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updateTodos)));

        response.status = 200;
        response.body = { status: 'Success', data: updateTodos }

    } catch(error) {
        response.status = 502;
        response.body = { status: 'Failed to delete', error }
    }
}