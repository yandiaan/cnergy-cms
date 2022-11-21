<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FrontEndSettingCollection;
use App\Http\Resources\IndexFrontEndSettingResource;
use App\Http\Resources\StaticPageCollection;
use App\Models\FrontEndSetting;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontEndSettingsController extends Controller
{
    /**
     * Get Front End Settings
     * @OA\Get (
     *     tags={"Front End Settings"},
     *     path="/api/fe-setting/",
     *     security={{"Authentication_Token":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="success",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="bad request",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="unauthorized",
     *       @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="The security token is invalid"),
     *          )
     *     )
     * )
     */
    public function index()
    {
        $menu_settings = FrontEndSetting::first()->makeHidden(['token', 'deleted_at', 'id']);
        return response()
            ->json(new IndexFrontEndSettingResource($menu_settings),
            Response::HTTP_OK);
    }
}
